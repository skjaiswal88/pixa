import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { getImageById } from "@/lib/actions/image.actions";

interface UpdatePageProps {
  params: Promise<{ id: string }>
}

const Page = async ({ params }: UpdatePageProps) => {
  // Await the params Promise for Next.js 15+
  const { id } = await params;
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) redirect("/sign-in");

  const dbUser = await getUserById(userId);
  const image = await getImageById(id);

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Update"
          userId={dbUser._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={dbUser.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default Page;