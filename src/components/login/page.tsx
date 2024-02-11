import FormLogin from "@/components/Form/FormLogin";

export default function Login() {
  return (
    <main className="p-6 md:p-12 min-h-flex flex justify-between items-start">
      <h1 className="text-zinc-500 font-medium py-8">minder app</h1>
      <div className="flex justify-center items-center w-full">
        <FormLogin />
      </div>
      <div className="bg-transparent" />
    </main>
  );
}
