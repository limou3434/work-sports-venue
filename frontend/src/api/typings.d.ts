declare namespace API {
  type BaseResponseBoolean = {
    code?: number;
    message?: string;
    data?: boolean;
  };

  type BaseResponseCourse = {
    code?: number;
    message?: string;
    data?: Course;
  };

  type BaseResponseListCourse = {
    code?: number;
    message?: string;
    data?: Course[];
  };

  type BaseResponseListLoginUserVO = {
    code?: number;
    message?: string;
    data?: LoginUserVO[];
  };

  type BaseResponseListUserCourse = {
    code?: number;
    message?: string;
    data?: UserCourse[];
  };

  type BaseResponseLoginUserVO = {
    code?: number;
    message?: string;
    data?: LoginUserVO;
  };

  type BaseResponseLong = {
    code?: number;
    message?: string;
    data?: number;
  };

  type BaseResponseUserCourse = {
    code?: number;
    message?: string;
    data?: UserCourse;
  };

  type Course = {
    id?: number;
    courseName?: string;
    reserveDate?: string;
    reserveTime?: string;
  };

  type CourseAddRequest = {
    courseName?: string;
    reserveDate?: string;
    reserveTime?: string;
  };

  type CourseDeleteRequest = {
    id?: number;
  };

  type CourseSearchRequest = {
    sortField?: string;
    sortOrder?: string;
    id?: number;
    courseName?: string;
  };

  type CourseUpdateRequest = {
    id?: number;
    courseName?: string;
    reserveDate?: string;
    reserveTime?: string;
  };

  type LoginUserVO = {
    id?: number;
    userAccount?: string;
    userWxUnion?: string;
    userMpOpen?: string;
    userEmail?: string;
    userPhone?: string;
    userAvatar?: string;
    userTags?: string;
    userNick?: string;
    userName?: string;
    userProfile?: string;
    userBirthday?: string;
    userCountry?: string;
    userAddress?: string;
    userRole?: number;
    userLevel?: number;
    userGender?: number;
  };

  type UserAddRequest = {
    userAccount?: string;
    userWxUnion?: string;
    userMpOpen?: string;
    userEmail?: string;
    userPhone?: string;
    userIdent?: string;
    userAvatar?: string;
    userTags?: string;
    userNick?: string;
    userName?: string;
    userProfile?: string;
    userBirthday?: string;
    userCountry?: string;
    userAddress?: string;
    userRole?: string;
    userLevel?: number;
    userGender?: number;
  };

  type UserCourse = {
    id?: number;
    userId?: number;
    courseId?: number;
  };

  type UserCourseAddRequest = {
    userId?: number;
    courseId?: number;
  };

  type UserCourseDeleteRequest = {
    id?: number;
  };

  type UserCourseSearchRequest = {
    sortField?: string;
    sortOrder?: string;
    id?: number;
    userId?: number;
    courseId?: number;
  };

  type UserCourseUpdateRequest = {
    id?: number;
    userId?: number;
    courseId?: number;
  };

  type UserDeleteRequest = {
    id?: number;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPasswd?: string;
  };

  type UserRegisterRequest = {
    userAccount?: string;
    userPasswd?: string;
    checkPasswd?: string;
  };

  type UserSearchRequest = {
    sortField?: string;
    sortOrder?: string;
    id?: number;
    userAccount?: string;
    userRole?: number;
    userLevel?: number;
  };

  type UserUpdataSelfRequest = {
    userWxUnion?: string;
    userMpOpen?: string;
    userEmail?: string;
    userPhone?: string;
    userIdent?: string;
    userAvatar?: string;
    userTags?: string;
    userNick?: string;
    userName?: string;
    userProfile?: string;
    userBirthday?: string;
    userCountry?: string;
    userAddress?: string;
    userGender?: number;
  };

  type UserUpdateRequest = {
    id?: number;
    userAccount?: string;
    userWxUnion?: string;
    userMpOpen?: string;
    userEmail?: string;
    userPhone?: string;
    userIdent?: string;
    userAvatar?: string;
    userTags?: string;
    userNick?: string;
    userName?: string;
    userProfile?: string;
    userBirthday?: string;
    userCountry?: string;
    userAddress?: string;
    userRole?: number;
    userLevel?: number;
    userGender?: number;
  };
}
