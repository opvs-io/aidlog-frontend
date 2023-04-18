import { useQuery } from 'react-query';

import * as requestService from '@/features/requests/request.service';
import { FindAllByRequesterParamsDto } from '@/features/requests/dto/find-all-by-requester-params.dto';

const useFindAllByRequester = (dto: FindAllByRequesterParamsDto) => {
  const mutation = useQuery({
    queryKey: ['requests', 'uid', dto.uid],
    queryFn: () => requestService.findAllByRequester(dto),
  });

  return mutation;
};

export default useFindAllByRequester;
