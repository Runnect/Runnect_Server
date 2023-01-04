import { Course, CourseGetDTO } from './../interface/DTO/CourseGetDTO';
import { PrivateCourse, PrivateCourseGetDTO } from './../interface/DTO/PrivateCourseGetDTO';
import { dateConvertString } from './../module/convert/convertTime';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCourseByUser = async (machineId: string) => {
    try {
        const result = await prisma.course.findMany({
            where: {
                user_machine_id: machineId,
            },
            orderBy: {
                created_at: "desc",
            },
        });
        console.log(result);

        if (!result) return null;
        const courses: Course[] = result.map((pc: any) => {
            let course: Course = {
                id: pc.id,
                image: pc.image,
                createdAt: dateConvertString(pc.created_at),
                departure: {
                    region: pc.departure_region,
                    city: pc.departure_city,
                },
            };
            return course;
        });

        const courseGetDTO: CourseGetDTO = {
            user: {
                machineId: machineId,
            },
            courses: courses,
        };
        return courseGetDTO;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getPrivateCourseByUser = async (machineId: string) => {
    try {
        const result = await prisma.course.findMany({
            where: {
                AND: [ {user_machine_id: machineId}, {private: true} ],
            },
            orderBy: {
                created_at: "desc",
            },
        });

        if (!result) return null;
        const privateCourses: PrivateCourse[] = result.map((pc: any) => {
            let privateCourse: PrivateCourse = {
                id: pc.id,
                image: pc.image,
                createdAt: dateConvertString(pc.created_at),
                distance: pc.distance,
                departure: {
                    region: pc.departure_region,
                    city: pc.departure_city,
                    town: pc.departure_town,
                    detail: pc.departure_detail,
                    name: pc.departure_name,
                },
            };
            return privateCourse;
        });

        const privateCourseGetDTO: PrivateCourseGetDTO = {
            user: {
                machineId: machineId,
            },
            privateCourses: privateCourses,
        };
        return privateCourseGetDTO;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const courseService = {
    getCourseByUser,
    getPrivateCourseByUser,
};

export default courseService;