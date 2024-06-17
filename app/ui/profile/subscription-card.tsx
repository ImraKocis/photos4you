"use client";
import { ReactElement, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/redux/hooks";
import { SubscriptionName, User } from "@/lib/types/user";
import { changeSubscription } from "@/app/actions/subscription/actions";
import { useDispatch } from "react-redux";
import { set } from "@/lib/redux/features/userSlice";
import { useToast } from "@/components/ui/use-toast";
import moment from "moment";
import { twMerge } from "tailwind-merge";

interface SubscriptionCardProps {
  title: SubscriptionName;
  price?: string;
  benefits: string[];
}

const handleIsCardDisabledByDate = (user: User | null): boolean => {
  // User dose not exists
  if (!user) return true;
  // Never changed
  if (user?.lastSubscriptionChange === null) return false;
  const currentTime = new Date();
  const lastChangeTime = new Date(user.lastSubscriptionChange);
  const timeDifference = currentTime.getTime() - lastChangeTime.getTime();
  const hoursDifference = timeDifference / (1000 * 60 * 60);

  return hoursDifference <= 24;
};

const handleOldSubscription = (user: User | null): boolean => {
  const oneDay = 1000 * 3600 * 24;
  if (!user?.subscription.odlSubscription) return false;
  return (
    new Date().getTime() - new Date(user.subscription.updatedAt).getTime() <=
    oneDay
  );
};

export function SubscriptionCard({
  title,
  price,
  benefits,
}: SubscriptionCardProps): ReactElement | null {
  const user = useUser();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Card
      className={twMerge(
        "flex flex-col border-2",
        user?.subscription.name == title
          ? "border-amber-500"
          : "border-gray-200",
        handleOldSubscription(user) &&
          user?.subscription.odlSubscription == title
          ? "border-primary"
          : "",
      )}
    >
      <CardHeader className="flex h-full items-start">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {title == "FREE" ? "free" : `${price}€/month`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
          {benefits.map((value, index) => (
            <li key={index} className="flex gap-2 w-full">
              <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
              {value}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant="outline"
          disabled={
            user?.subscription?.name == title ||
            isSubmitting ||
            handleIsCardDisabledByDate(user)
          }
          onClick={async () => {
            setIsSubmitting(true);
            const newUserData = await changeSubscription({
              userId: user?.id,
              subscriptionId: user?.subscription.id,
              newSubscriptionName: title,
              oldSubscriptionName: user?.subscription.name,
            });

            if (newUserData) {
              dispatch(set(newUserData));
              toast({
                title: "Subscription successfully changed",
                description: `Your subscription is valid from ${moment(new Date(newUserData.subscription.validFrom)).format("Do. MMMM YYYY.")}`,
              });
            }

            setIsSubmitting(false);
          }}
        >
          Select Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
