import { isFalse, isUndefined } from "@/lib/utils";
import { getUserAction } from "@/server-actions/user.action";
import ProfileForm from "@/components/forms/profile.form";
import { ROUTES } from "@/constants";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const user = await getUserAction();

  if (isUndefined(user!.data)) {
    redirect(ROUTES.SIGN_IN);
  }
  if (isFalse(user!.success)) {
    redirect(ROUTES.SIGN_IN);
  }

  return (
    <div className="flex min-h-screen items-center justify-center mr-4">
      <div className="w-full max-w-sm">
        <ProfileForm user={user!.data!} />
      </div>
    </div>
  );
};

export default ProfilePage;
