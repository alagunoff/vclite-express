import { type Author } from "@prisma/client";

import prisma from "src/shared/prisma";
import { type ValidatedPaginationQueryParameters } from "src/shared/pagination/types";
import {
  createPaginationParameters,
  calculatePagesTotalNumber,
} from "src/shared/pagination/utils";

import { type ValidatedCreationData, type ValidatedUpdateData } from "./types";

async function createAuthor(
  { description, userId }: ValidatedCreationData,
  onSuccess: () => void,
  onFailure: () => void
): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (user) {
    await prisma.author.create({ data: { description, userId: user.id } });

    onSuccess();
  } else {
    onFailure();
  }
}

async function getAuthors(
  validatedPaginationQueryParameters: ValidatedPaginationQueryParameters,
  onSuccess: (
    authors: Array<Omit<Author, "userId">>,
    authorsTotalNumber: number,
    pagesTotalNumber: number
  ) => void
): Promise<void> {
  const authors = await prisma.author.findMany({
    ...createPaginationParameters(validatedPaginationQueryParameters),
    select: {
      id: true,
      description: true,
    },
  });
  const authorsTotalNumber = await prisma.author.count();

  onSuccess(
    authors,
    authorsTotalNumber,
    calculatePagesTotalNumber(authorsTotalNumber, authors.length)
  );
}

async function updateAuthorById(
  id: number,
  { description }: ValidatedUpdateData,
  onSuccess: () => void,
  onFailure: () => void
): Promise<void> {
  try {
    await prisma.author.update({ where: { id }, data: { description } });

    onSuccess();
  } catch {
    onFailure();
  }
}

async function deleteAuthorById(
  id: number,
  onSuccess: () => void,
  onFailure: () => void
): Promise<void> {
  try {
    await prisma.author.delete({ where: { id } });

    onSuccess();
  } catch {
    onFailure();
  }
}

export { createAuthor, getAuthors, updateAuthorById, deleteAuthorById };
