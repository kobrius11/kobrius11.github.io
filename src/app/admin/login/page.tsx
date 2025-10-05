import LoginForm from "@/components/ui/admin/login/login-form";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="w-[25%]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your login information</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
