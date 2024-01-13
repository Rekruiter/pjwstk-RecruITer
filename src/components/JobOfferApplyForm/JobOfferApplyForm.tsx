import { applyJobOfferPost } from '@/api/jobOffers/applyJobOffer';
import { Paths } from '@/constants/paths';
import { ApplyJobOfferSchema, IApplyJobOffer, IJobOffer } from '@/types/jobOfferTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormFieldWrapper from '../FormHelpers/FormFieldWrapper';
import ExpectedSalaryField from './JobOfferApplyFields/ExpectedSalaryField';
import QuestionAnswersField from './JobOfferApplyFields/QuestionAnswersField';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner/Spinner';

interface JobOfferApplyFormProps {
  idJobOffer: string;
  questions: IJobOffer['questions'];
}

const JobOfferApplyForm = ({ idJobOffer, questions }: JobOfferApplyFormProps) => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(['jobOfferApplyData', idJobOffer], applyJobOfferPost, {
    onSuccess: () => {
      toast.success('Applied successfully');
      navigate(Paths.jobOffers.path);
    },
    onError: () => {
      toast.error('An error ocurred');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<IApplyJobOffer>({
    resolver: zodResolver(ApplyJobOfferSchema),
    defaultValues: {
      answers: questions?.map((question) => {
        return {
          question: question,
          answerToQuestion: '',
        };
      }),
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    handleSubmit(
      async (data) => {
        mutate({
          inputData: {
            id: idJobOffer,
            ...data,
          },
        });
      },
      (e) => {
        console.log(e);
      },
    )();
  };

  return (
    <form onSubmit={onSubmit} className="mb-10 flex flex-col gap-3 rounded-md bg-dark/10 p-4 shadow-md">
      <FormFieldWrapper<IApplyJobOffer>
        field={'introduceYourself'}
        label="Introduce yourself "
        placeholder="Tell us about yourself, your experience, skills, etc."
        register={register}
        error={errors.introduceYourself}
        isDark
      />
      <ExpectedSalaryField register={register} error={errors.expectedSalary} />
      <QuestionAnswersField register={register} errors={errors.answers} getValues={getValues} />
      <Button className="mt-5 w-fit" disabled={isLoading}>
        {isLoading ? <Spinner className="h-6 w-6 border-2" isLight /> : 'Apply'}
      </Button>
    </form>
  );
};

export default JobOfferApplyForm;
