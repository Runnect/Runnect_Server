import { SocialCreateRequestDTO } from './../interface/DTO/auth/SocialCreateDTO';
import { PrismaClient, User } from '@prisma/client';
import { randomInitialNickname } from '../module/randomInitialNickname';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";

const prisma = new PrismaClient();

const getUserByEmail = async (socialCreateRequestDTO: SocialCreateRequestDTO) => {
    try {
        const userByEmail = await prisma.user.findFirst({
            where: {
                AND: [{ email: socialCreateRequestDTO.email }, { provider: socialCreateRequestDTO.provider }],
            },
        });
        return userByEmail;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createUser = async (socialCreateRequestDTO: SocialCreateRequestDTO, refreshToken: string) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                nickname: randomInitialNickname(),
                social_id: socialCreateRequestDTO.socialId,
                email: socialCreateRequestDTO.email,
                provider: socialCreateRequestDTO.provider,
                refreshToken: refreshToken,
            },
        });
        if (!newUser) return null;
        return newUser;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code == "P2002") {
                // 이미 생성한 유저
                return `이미 생성된 유저입니다.`;
            }
        } else if (error instanceof PrismaClientValidationError) {
            return `${error.message}`;
        }
        throw error;
    }
};

const updateRefreshToken = async (userId: number, refreshToken: string) => {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken: refreshToken,
            },
        });
        return updatedUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const authService = {
    getUserByEmail,
    createUser,
    updateRefreshToken,
};

export default authService;