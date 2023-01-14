import LoginButton from "~/components/login-button.client";

export default async function Login() {
  return (
    <div className="m-4 inline-flex h-screen w-full items-center justify-center">
      <div className="relative h-[2.65rem]">
        <LoginButton />
      </div>
    </div>
  );
}
