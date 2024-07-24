import { PrismaClient, Major } from "@prisma/client";
import { CreateMajorDto, UpdateMajorDto } from "../types/major";

const prisma = new PrismaClient()

export const createMajor = async (major: CreateMajorDto): Promise<Major> => {
    return prisma.major.create({ data: major })
}

export const getMajors = async (): Promise<Major[]> => {
    return prisma.major.findMany();
}

export const getMajor = async (id: string): Promise<Major | null> => {
    return prisma.major.findUnique({ where: { id }})
}

export const updateMajor = async (id: string, data: UpdateMajorDto): Promise<Major> => {
    return prisma.major.update({
        where: { id },
        data
    })
}

export const removeMajor = async (id: string): Promise<void> => {
    if (!id) {
        throw new Error('ID do major não fornecido.');
    }
    await prisma.major.delete({ where: { id } });
}