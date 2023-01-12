import LoginButton from "~/components/login-button.client";

// do not cache this page
export const revalidate = 0;

export default async function Login() {
  return (
    <div className="group m-4 inline-flex h-screen w-full items-center justify-center">
      <div className="relative h-10">
        <LoginButton />
      </div>
    </div>
  );
}
