import { PublicCourseCreateRequestDTO } from "../interface/DTO/publicCourse/PublicCourseCreateDTO";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";
import { stampService } from "../service";
import { checkScrap } from "../module/check/checkScrap";
import { pathConvertCoor } from "../module/convert/pathConvertCoor";
import { PublicCourseDetailGetDTO } from "./../interface/DTO/publicCourse/PublicCourseGetDTO";

const prisma = new PrismaClient();

const createPublicCourse = async (publicCourseCreateRequestDTO: PublicCourseCreateRequestDTO) => {
  try {
    const publicCourseData = await prisma.publicCourse.create({
      data: {
        course_id: +(publicCourseCreateRequestDTO.courseId as string),
        title: publicCourseCreateRequestDTO.title,
        description: publicCourseCreateRequestDTO.description,
      },
    });

    if (!publicCourseData) return null;
    else {
      // create 성공시, courseId로 해당 코스 private를 false로 변경
      const courseData = await prisma.course.update({
        where: { id: publicCourseData.course_id },
        data: {
          private: false,
        },
      });

      await stampService.createStampByUser(courseData.user_id, "u");

      return publicCourseData;
    }
  } catch (error) {
    //~ error 분기 처리 : db의 제약조건등을 위반시 생기는 에러
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        //~ 제약조건등을 위반 에러
        //이미 업로드한 코스
        return `해당 ${error.meta?.target}는 이미 업로드된 코스입니다.`;
      } else if (error.code === "P2003") {
        //~ fk 외래키제약조건실패
        //없는 코스
        return `${error.meta?.field_name}의 아이디가 유효하지 않습니다.`;
      }
    }
    //~ error 분기 처리 : db 칼럼의 데이터 타입을 지키지 않을때, null이 될수 없는 필드가 누락되었을때
    else if (error instanceof PrismaClientValidationError) {
      return `${error.message}`;
    }
    throw error;
  }
};

const getPublicCourseByUser = async (userId: number) => {
  try {
    const courseData = await prisma.course.findMany({
      where: {
        AND: [{ user_id: userId }, { private: false }],
      },
      include: {
        PublicCourse: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return courseData;
  } catch (error) {
    //~ get은 에러분기처리를 할게없음... 어차피 데이터가 있냐없냐라서
    console.log(error);
    throw error;
  }
};

const getPublicCourseDetail = async (userId: number, publicCourseId: number) => {
  try {
    /** path정보를 가져오지 않은 prisma orm 사용 코드
    const publicCourseData = await prisma.publicCourse.findUnique({
      where: {
        id: publicCourseId,
      },
      include: {
        Course: {
          include: {
            User: true,
          },
        },
        Scrap: {
          where: {
            AND: [{ user_id: userId }, { scrapTF: true }],
          },
        },
      },
    });

    return publicCourseData;

    */
    const publicCourseData: any = await prisma.$queryRaw`SELECT "PublicCourse"."id" AS "pid","PublicCourse"."title","PublicCourse"."description", "Course"."id" AS "cid", "Course"."path"::text,"Course"."image","Course"."distance"::text,"Course"."departure_region","Course"."departure_city","Course"."departure_town","Course"."departure_name", "User"."nickname", "User"."id" AS "pcuid", "User"."level", "User"."latest_stamp" FROM "PublicCourse", "Course", "User" WHERE "PublicCourse"."id"=${publicCourseId}  AND "PublicCourse"."course_id" = "Course"."id" AND "Course"."user_id"="User"."id"`;
    if (!publicCourseData) {
      return publicCourseData;
    }
    const isPublicScrap = await prisma.scrap.findFirst({
      where: { user_id: userId, public_course_id: publicCourseId, scrapTF: true },
    });
    const publicCourseDetailGetDTO: PublicCourseDetailGetDTO = {
      user: {
        nickname: publicCourseData[0].nickname,
        level: publicCourseData[0].level,
        image: publicCourseData[0].latest_stamp,
        isNowUser: publicCourseData[0].pcuid == userId ? true : false,
      },
      publicCourse: {
        id: publicCourseData[0].pid,
        courseId: publicCourseData[0].cid,
        scrap: checkScrap(isPublicScrap),
        image: publicCourseData[0].image,
        title: publicCourseData[0].title,
        description: publicCourseData[0].description,
        path: pathConvertCoor(publicCourseData[0].path),
        distance: +publicCourseData[0].distance,
        departure: {
          region: publicCourseData[0].departure_region,
          city: publicCourseData[0].departure_city,
          town: publicCourseData[0].departure_town,
          name: publicCourseData[0].departure_name,
        },
      },
    };

    return publicCourseDetailGetDTO;
  } catch (error) {
    //~ get은 에러분기처리를 할게없음... 어차피 데이터가 있냐없냐라서
    console.log(error);
    throw error;
  }
};

const recommendPublicCourse = async (userId: number) => {
  try {
    const data = await prisma.publicCourse.findMany({
      include: {
        _count: {
          select: { Scrap: true },
        },
        Course: true,
        Scrap: {
          where: {
            AND: [{ user_id: userId }, { scrapTF: true }],
          },
        },
      },
      orderBy: {
        Scrap: {
          _count: "desc",
        },
      },
    });

    return data;
  } catch (error) {
    //~ get은 에러분기처리를 할게없음... 어차피 데이터가 있냐없냐라서
    console.log(error);
    throw error;
  }
};

const searchPublicCourse = async (userId: number, keyword: string) => {
  try {
    const data = await prisma.publicCourse.findMany({
      where: {
        OR: [
          {
            title: {
              contains: keyword,
            },
          },
          {
            Course: {
              departure_region: { contains: keyword },
            },
          },
          {
            Course: {
              departure_city: { contains: keyword },
            },
          },
          {
            Course: {
              departure_city: { contains: keyword },
            },
          },
          {
            Course: {
              departure_town: { contains: keyword },
            },
          },
          {
            Course: {
              departure_detail: { contains: keyword },
            },
          },
          {
            Course: {
              departure_name: { contains: keyword },
            },
          },
        ],
      },
      include: {
        Course: true,
        Scrap: {
          where: {
            AND: [{ user_id: userId }, { scrapTF: true }],
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return data;
  } catch (error) {
    //~ get은 에러분기처리를 할게없음... 어차피 데이터가 있냐없냐라서
    console.log(error);
    throw error;
  }
};

const publicCourseService = {
  createPublicCourse,
  getPublicCourseByUser,
  getPublicCourseDetail,
  recommendPublicCourse,
  searchPublicCourse,
};

export default publicCourseService;
