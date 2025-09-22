import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

type Props = {
  params: Promise<{ _id: string }>;
};

async function DiaryEntryDetails({ params }: Props) {
  const { _id } = await params;
  const queryClient = new QueryClient();
}
export default DiaryEntryDetails;
