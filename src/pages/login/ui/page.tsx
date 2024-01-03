import { LoginForm } from "@/features/login"

export const LoginPage = () => {
  return (
    <section className="w-screen h-screen flex justify-center items-center relative">
      <LoginForm />
      <div className="bg-primary text-textColor w-full py-2 absolute text-[13px] bottom-0 left-0 text-center">Powered by Yollo Team</div>
    </section>
  )
}