import { NextResponse } from "next/server";
import courses from "../data.json";

//implementing search functionality

export async function GET(request) {
  // query params
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  // filter the courses which contain query in their title
  const filteredCourses = courses.filter((course) => {
    return course.title.toLowerCase().includes(query.toLowerCase());
  });
  return NextResponse.json(filteredCourses);
}
