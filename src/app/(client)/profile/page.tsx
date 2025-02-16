import { getUserAction } from "@/server-actions/user.action";
import ProfileForm from "@/components/forms/profile.form";
import { ROUTES } from "@/constants";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const user = await getUserAction();

  if (!user || !user.success) {
    redirect(ROUTES.SIGN_IN);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[400px]">
        <ProfileForm user={user!.data!} />
      </div>
    </div>
  );
};

export default ProfilePage;
