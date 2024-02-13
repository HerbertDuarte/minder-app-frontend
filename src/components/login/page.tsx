import FormLogin from "@/components/Form/FormLogin";

export default function Login() {
  return (
    <main className="p-3 md:p-12 min-h-flex flex justify-between items-start">
      <h1 className="text-gray-700 font-medium p-8">minder app</h1>
      <div className="flex justify-center items-center w-full pb-52">
        <FormLogin />
      </div>
      <div className="bg-transparent" />
    </main>
  );
}
