const users = [
  { email: "hyunik@test.com", password: "123", name: "조현익" },
  { email: "codingon@test.com", password: "123", name: "코딩온" },
  { email: "c", password: "123", name: "짱구" },
];

export function signIn(email, password) {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user === undefined) {
    console.log("User not found", email, password);
    throw new Error("User not found");
  }
  return user;
}
