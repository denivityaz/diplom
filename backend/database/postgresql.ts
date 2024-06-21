// Установите библиотеку pg при помощи npm или yarn
// npm install pg

import { Pool, QueryResult, QueryResultRow } from "pg";
import type { Course } from "../types/models/Course";
import { User } from "../types/models/User";
import { Category } from "../types/models/Category";
import { Appointment } from "../types/models/Appointment";
import { CourseComment } from "../types/models/CourseComment";
import { Purchase } from "../types/models/Purchase";

class DatabaseModel {
  private pool: Pool;

  constructor() {
    const poolConfig = {
      user: process.env.DB_USER || "postgres",
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME || "postgres",
      password: process.env.DB_PASSWORD || "Kras2826600",
      port: Number(process.env.DB_PORT) || 5432,
    };

    this.pool = new Pool(poolConfig);
  }

  async query<T extends QueryResultRow>(
    sql: string,
    params: any[]
  ): Promise<T[]> {
    try {
      const client = await this.pool.connect();
      const result: QueryResult<T> = await client.query(sql, params);
      client.release();
      return result.rows;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  async createCourse(course: Course): Promise<void> {
    const sql = `
            INSERT INTO courses (title, price, description, demo_path, full_path, img_path, category_id, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ,$9)
        `;
    const params = [
      course.title,
      course.price,
      course.description,
      course.demo_path,
      course.full_path,
      course.img_path,
      course.category_id,
      new Date(),
      new Date(),
    ];

    await this.query<QueryResultRow>(sql, params);
  }

  async updateCourse(
    ID: number,
    updatedFields: Partial<Course>
  ): Promise<void> {
    const fieldUpdates = Object.keys(updatedFields)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");

    const sql = `
            UPDATE courses
            SET ${fieldUpdates}
            WHERE id = $1
        `;
    const params = [ID, ...Object.values(updatedFields)];

    await this.query<QueryResultRow>(sql, params);
  }

  async deleteCourse(ID: number): Promise<void> {
    const sql = `
            DELETE FROM courses
            WHERE id = $1
        `;
    const params = [ID];

    await this.query<QueryResultRow>(sql, params);
  }

  async getCourses(full: boolean | undefined): Promise<Course[]> {
    let sql
    if(full)
      sql = "SELECT * FROM courses";
    else
      sql = "SELECT id, title, img_path FROM courses"
      return await this.query<Course>(sql, []);
  }
  async getCoursesByID(ID: number): Promise<Course> {
    const sql = `
                SELECT * FROM courses
                WHERE id =$1
              `;
    const params = [ID]
    const res = await this.query<Course>(sql, params)
    return res[0];
  }
  // END
  // _________________________________________________________________

  async createUsers(user: User) {
    const sql = `
        INSERT INTO users (name, email, isadmin, hashed_password, about, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    const params = [
      user.name,
      user.email,
      user.isadmin,
      user.hashed_password,
      user.about,
      new Date(),
      new Date(),
    ];

    await this.query<QueryResultRow>(sql, params);
  }
  async getUsers(): Promise<User[]> {
    const sql = "SELECT * FROM users";
    return await this.query<User>(sql, []);
  }
  async getUsersByEmail(email: string): Promise<User | false> {
    const sql = `
                  SELECT * FROM users
                  WHERE email = $1
                `;
    const user = await this.query<User>(sql, [email]);
    if(user[0])
    return user[0]
    else
    return false
  }
  async updateUsers(
    ID: number,
    updatedFields: Partial<User>
  ): Promise<void> {
    const fieldUpdates = Object.keys(updatedFields)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");

    const sql = `
            UPDATE users
            SET ${fieldUpdates}
            WHERE id = $1
        `;
    const params = [ID, ...Object.values(updatedFields)];

    await this.query<QueryResultRow>(sql, params);
  }
  async deleteUsers(ID: number): Promise<void> {
    const sql = `
            DELETE FROM users
            WHERE id = $1
        `;
    const params = [ID];

    await this.query<QueryResultRow>(sql, params);
  }

  // END
  // _________________________________________________________________

  async createCategory(category: Category) {
    const sql = `
        INSERT INTO categories (title, created_at, updated_at)
        VALUES ($1, $2, $3)
    `;

    const params = [category.title, new Date(), new Date()];

    await this.query<QueryResultRow>(sql, params);
  }
  async getCategory(): Promise<Category[]> {
    const sql = "SELECT * FROM categories";
    return await this.query<Category>(sql, []);
  }
  async updateCategory(
    ID: number,
    updatedFields: Partial<Category>
  ): Promise<void> {
    const fieldUpdates = Object.keys(updatedFields)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");

    const sql = `
            UPDATE categories
            SET ${fieldUpdates}
            WHERE id = $1
        `;
    const params = [ID, ...Object.values(updatedFields)];

    await this.query<QueryResultRow>(sql, params);
  }
  async deleteCategory(ID: number): Promise<void> {
    const sql = `
            DELETE FROM categories
            WHERE id = $1
        `;
    const params = [ID];

    await this.query<QueryResultRow>(sql, params);
  }

  // END
  // _________________________________________________________________


  async createAppointment(appointment: Appointment) {
    const sql = `
        INSERT INTO appointments (name, user_id, connect_way, message, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;

    const params = [
        appointment.name, 
        appointment.user_id, 
        appointment.connect_way, 
        appointment.message, 
        new Date(), 
        new Date()
    ];

    await this.query<QueryResultRow>(sql, params);
  }
  async getAppointment(): Promise<Appointment[]> {
    const sql = "SELECT * FROM appointments";
    return await this.query<Appointment>(sql, []);
  }
  async updateAppointment(
    ID: number,
    updatedFields: Partial<Appointment>
  ): Promise<void> {
    const fieldUpdates = Object.keys(updatedFields)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");

    const sql = `
            UPDATE appointments
            SET ${fieldUpdates}
            WHERE id = $1
        `;
    const params = [ID, ...Object.values(updatedFields)];

    await this.query<QueryResultRow>(sql, params);
  }
  async deleteAppointment(ID: number): Promise<void> {
    const sql = `
            DELETE FROM appointments
            WHERE id = $1
        `;
    const params = [ID];

    await this.query<QueryResultRow>(sql, params);
  }

  // END
  // _________________________________________________________________


  async createCourseComment(CourseComment: CourseComment) {
    const sql = `
        INSERT INTO course_comments (comment_text, course_id, user_id, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5)
    `;

    const params = [
        CourseComment.comment_text, 
        CourseComment.course_id, 
        CourseComment.user_id, 
        new Date(), 
        new Date()
    ];

    await this.query<QueryResultRow>(sql, params);
  }
  async getCourseComment(): Promise<CourseComment[]> {
    const sql = "SELECT * FROM course_comments";
    return await this.query<CourseComment>(sql, []);
  }
  async updateCourseComment(
    ID: number,
    updatedFields: Partial<CourseComment>
  ): Promise<void> {
    const fieldUpdates = Object.keys(updatedFields)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");

    const sql = `
            UPDATE course_comments
            SET ${fieldUpdates}
            WHERE id = $1
        `;
    const params = [ID, ...Object.values(updatedFields)];

    await this.query<QueryResultRow>(sql, params);
  }
  async deleteCourseComment(ID: number): Promise<void> {
    const sql = `
            DELETE FROM course_comments
            WHERE id = $1
        `;
    const params = [ID];

    await this.query<QueryResultRow>(sql, params);
  }


    // END
  // _________________________________________________________________


  async createPurchase(Purchase: Purchase) {
    const sql = `
        INSERT INTO purchases (detail, user_id, course_id, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5)
    `;
    const params = [
        Purchase.detail, 
        Purchase.user_id, 
        Purchase.course_id, 
        new Date(), 
        new Date()
    ];

    await this.query<QueryResultRow>(sql, params);
  }
  async getPurchase(): Promise<Purchase[]> {
    const sql = "SELECT * FROM purchases";
    return await this.query<Purchase>(sql, []);
  }
  async getAllPurchaseByUser(user_ID: number): Promise<Purchase[]> {
    const sql = `
        SELECT * FROM purchases
        WHERE user_id = $1
    `;
    const params = [
    user_ID,
    ]
    return await this.query<Purchase>(sql, params);
  }
  async getPurchaseByUser(user_ID: number, course_ID: number): Promise<boolean> {
    const sql = `
                  SELECT * FROM purchases
                  WHERE user_id = $1 and course_id = $2
                `;
  const params = [
    user_ID,
    course_ID
  ]
  const purchase = await this.query<Purchase>(sql, params);
  if(purchase[0])
    return true
  else
    return false
  }
  async updatePurchase(
    ID: number,
    updatedFields: Partial<Purchase>
  ): Promise<void> {
    const fieldUpdates = Object.keys(updatedFields)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");

    const sql = `
            UPDATE purchases
            SET ${fieldUpdates}
            WHERE id = $1
        `;
    const params = [ID, ...Object.values(updatedFields)];

    await this.query<QueryResultRow>(sql, params);
  }
  async deletePurchase(ID: number): Promise<void> {
    const sql = `
            DELETE FROM purchases
            WHERE id = $1
        `;
    const params = [ID];

    await this.query<QueryResultRow>(sql, params);
  }


}
const pg = new DatabaseModel();
export default pg;
