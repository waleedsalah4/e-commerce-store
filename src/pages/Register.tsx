import { RegisterForm } from "@/components/forms/RegisterForm";

const Register = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg shadow-lg p-6 rounded-lg">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="bg-[#FFCEAE] relative hidden lg:block z-10">
        <img
          src="/register.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Register;
