export const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1]; // Extract payload part
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  };
  
  export const getUsernameFromToken = (token) => {
    const decodedToken = decodeToken(token);
    // Assuming the token's payload structure is { sub: { username: "your_username", ... } }
    return decodedToken?.sub?.username || "";
  };



//   import { getUsernameFromToken } from "./authHelpers";

//   const token = localStorage.getItem("token");
//   const username = getUsernameFromToken(token);
//   console.log("Extracted Username:", username);