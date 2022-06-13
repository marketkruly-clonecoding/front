import jwt_decode from "jwt-decode";

const checkAndMakeValidToken = async () => {
  const accessToken: string = localStorage.getItem("weKurly_access_token")
    ? JSON.parse(localStorage.getItem("weKurly_access_token")!)
    : "";
  if ((jwt_decode(accessToken) as any).exp <= (Date.now() + 10000) / 1000) {
    const user: { userIdx: string; name: string } | null = JSON.parse(
      localStorage.getItem("weKurlyuser")!
    );
    const newAccessToken = await (
      await fetch(user ? `/app/users/${user.userIdx}/refresh` : "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(""),
      })
    ).json();
    if (!newAccessToken || !newAccessToken.isSuccess) {
      return false;
    }
    localStorage.setItem(
      "weKurly_access_token",
      JSON.stringify(newAccessToken.result)
    );
    return true;
  }
};

export default checkAndMakeValidToken;
