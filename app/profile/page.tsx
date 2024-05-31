import React, { ReactElement, Suspense } from "react";
import { UserProfileImage } from "@/app/ui/profile/user-profile-image";
import { UserPersonalInformationForm } from "@/app/ui/profile/personal-information";
import { SubscriptionCard } from "@/app/ui/profile/subscription-card";
import { AuthWrapper } from "@/app/ui/auth/auth-page-wrapper";
import { SmallPostGrid } from "@/app/ui/post/small-post-grid";
import { getUserPosts } from "@/app/actions/post/actions";
import Loading from "@/app/loading";

export default async function ProfilePage(): Promise<ReactElement> {
  const userPosts = await getUserPosts();
  return (
    <Suspense fallback={<Loading />}>
      <AuthWrapper>
        <div className="flex flex-col justify-center w-full max-w-[800px] mx-auto">
          <section className="flex gap-24 w-full mb-12">
            <UserProfileImage />
            <UserPersonalInformationForm />
          </section>
          <section className="grid grid-cols-3 gap-6 mb-8">
            <SubscriptionCard
              title="FREE"
              price="0"
              benefits={["Upload 5 photos per day", "Maximum photo size 2MB"]}
            />
            <SubscriptionCard
              title="PRO"
              price="5.99"
              benefits={["Upload 7 photos per day", "Maximum photo size 3MB"]}
            />
            <SubscriptionCard
              title="GOLD"
              price="9.99"
              benefits={["Upload 10 photos per day", "Maximum photo size 5MB"]}
            />
          </section>
          <section>
            <SmallPostGrid posts={userPosts} />
          </section>
        </div>
      </AuthWrapper>
    </Suspense>
  );
}
