import queryClient from '@/configs/query-client';
import { CreateRequestDto } from '@/features/requests/dto/create-request.dto';
import { Request } from '@/features/requests/entity/request.entity';
import * as requestService from '@/features/requests/request.service';
import { useMutation } from 'react-query';

const useCreate = () => {
  const mutation = useMutation<Request, Error, CreateRequestDto>({
    mutationFn: requestService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['requests']);
    },
  });

  return mutation;
};

export default useCreate;
