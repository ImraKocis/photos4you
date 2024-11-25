import React, { ReactElement, Suspense } from "react";
import { UserProfileImage } from "@/app/ui/profile/user-profile-image";
import { UserPersonalInformationForm } from "@/app/ui/profile/personal-information";
import { SubscriptionCard } from "@/app/ui/profile/subscription-card";
import { AuthWrapper } from "@/app/ui/auth/auth-page-wrapper";
import { SmallPostGrid } from "@/app/ui/post/small-post-grid";
import { getUserPosts } from "@/app/actions/post/actions";
import Loading from "@/app/loading";
import {
  getDailyLimits,
  getUploadSizes,
} from "@/app/actions/subscription/actions";
import { DailyLimit, UploadSize } from "@/lib/types/user";

function handleSubscriptionCardBenefits(
  dailyLimits?: DailyLimit,
  uploadSizes?: UploadSize,
) {
  return [
    `Upload ${dailyLimits?.limit} photos per day`,
    `Maximum photo size ${uploadSizes?.size}MB`,
  ];
}

function handlePrice(dailyLimit: DailyLimit | null): string {
  switch (dailyLimit?.subscriptionName) {
    case "FREE":
      return "0";
    case "PRO":
      return "5.99";
    case "GOLD":
      return "9.99";
    default:
      return "0";
  }
}

export default async function ProfilePage(): Promise<ReactElement> {
  const userPosts = await getUserPosts();
  const uploadSizes = await getUploadSizes();
  const dailyLimits = await getDailyLimits();
  return (
    <Suspense fallback={<Loading />}>
      <AuthWrapper>
        <div className="flex flex-col justify-center w-full max-w-[800px] mx-auto">
          <section className="flex gap-24 w-full mb-12">
            <UserProfileImage />
            <UserPersonalInformationForm />
          </section>
          <section className="grid grid-cols-3 gap-6 mb-8">
            {dailyLimits?.map((dailyLimit) => (
              <React.Fragment key={dailyLimit.id}>
                <SubscriptionCard
                  title={dailyLimit.subscriptionName}
                  price={handlePrice(dailyLimit)}
                  benefits={handleSubscriptionCardBenefits(
                    dailyLimit,
                    uploadSizes?.find(
                      (element) =>
                        element.subscriptionName ===
                        dailyLimit.subscriptionName,
                    ),
                  )}
                />
              </React.Fragment>
            ))}
          </section>
          <section>
            <SmallPostGrid posts={userPosts} />
          </section>
        </div>
      </AuthWrapper>
    </Suspense>
  );
}
