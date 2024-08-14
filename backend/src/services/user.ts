import User from "../entity/User"
import { LessThanOrEqual, MoreThanOrEqual, getRepository } from "typeorm";

const user_data = [
  "user.id",
  "user.name",
  "user.email",
  "user.mobile",
  "user.gender",
  "user.date_of_birth",
  "user.web_token",
  "user.created_on",
  "user.modified_on",
  "user.is_admin",
  "user.is_active",
  "user.is_deleted",
  "created_by.id",
  "created_by.name",
  "created_by.email",
  "modified_by.id",
  "modified_by.name",
  "modified_by.email",
];

interface IUserTypes {
  per_page?: number;
  page_number?: number;
  start_date?: string;
  end_date?: string;
  sort_order?: SORT_ORDERTYPE;
  current_user?: any;
}

enum SORT_ORDERTYPE {
  ASC = "ASC",
  DESC = "DESC",
}

export const find_user_by_id = async (id: string) => {
  const userRepo = getRepository(User);

  const find_user_query = userRepo
    .createQueryBuilder("user")
    .select(user_data)
    .leftJoin("user.created_by", "created_by")
    .leftJoin("user.modified_by", "modified_by")
    .where("user.id = :id", { id })
    .andWhere({ is_deleted: false });

  const find_user = await find_user_query.getOne();

  return find_user;
};

export const find_user_by_email = async (email: string) => {
  const userRepo = getRepository(User);
  const find_user_query = userRepo
    .createQueryBuilder("user")
    .select(["user.id", "user.verify_email_code", "user.email"])
    .where("user.email = :email", { email })

  const find_user = await find_user_query.getOne();

  return find_user;
}

export const find_all_users = async ({
  per_page,
  page_number,
  start_date,
  end_date,
  sort_order,
  current_user,
}: IUserTypes) => {
  const userRepo = getRepository(User);

  const find_users_query = userRepo
    .createQueryBuilder("user")
    .select(user_data)
    .leftJoin("user.city", "city")
    .leftJoin("user.user_type", "user_type")
    .leftJoin("user.created_by", "created_by")
    .leftJoin("user.modified_by", "modified_by")
    .where({ is_deleted: false })
    .orderBy("user.modified_on", sort_order || "DESC");

  if (per_page && page_number) {
    find_users_query.skip(per_page * (page_number - 1)).take(per_page);
  }

  if (start_date) {
    find_users_query.andWhere(
      "user.created_on >= :start_date",
      { start_date: new Date(start_date) }
    );
  }

  if (end_date) {
    find_users_query.andWhere(
      "user.created_on <= :end_date",
      { end_date: new Date(end_date) }
    );
  }

  const allUsers = await find_users_query.getManyAndCount();

  return {
    data: allUsers[0],
    page_number: Number(page_number),
    per_page: Number(per_page),
  };
};



