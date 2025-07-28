import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface AddTransformationPageProps {
  params: Promise<{ type: TransformationTypeKey }>
}

const AddTransformationTypePage = async ({ params }: AddTransformationPageProps) => {
  const { userId } = await auth();
  
  // Await the params Promise for Next.js 15+
  const { type } = await params;
  
  // console.log('Clerk userId:', userId); // Debug logging
  
  const transformation = transformationTypes[type];

  if(!userId) redirect('/sign-in')

  const user = await getUserById(userId);
  // console.log('MongoDB user found:', user); // Debug logging

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
    
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage