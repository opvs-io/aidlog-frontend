import { useQuery } from 'react-query';

import * as requestService from '@/features/requests/request.service';
import { FindAllByOrganizationParamsDto } from '@/features/requests/dto/find-all-by-organization-params.dto';

const useFindAllByOrganization = (dto: FindAllByOrganizationParamsDto) => {
  const mutation = useQuery({
    queryKey: ['requests', 'organizationId', dto.organizationId],
    queryFn: () => requestService.findAllByOrganization(dto),
  });

  return mutation;
};

export default useFindAllByOrganization;
