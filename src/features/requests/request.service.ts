import http from '@/configs/http';
import urls from '@/configs/urls';

import { CreateRequestDto } from '@/features/requests/dto/create-request.dto';
import { FindAllByOrganizationParamsDto } from '@/features/requests/dto/find-all-by-organization-params.dto';
import { FindAllByRequesterParamsDto } from '@/features/requests/dto/find-all-by-requester-params.dto';
import { Request } from '@/features/requests/entity/request.entity';

export const create = async (dto: CreateRequestDto) => {
  const { data } = await http.post<Request>(urls.requests.create, dto);

  return data;
};

export const findAllByRequester = async (dto: FindAllByRequesterParamsDto) => {
  const { data } = await http.get<Request[]>(
    urls.requests.findAllByRequester(dto.uid),
  );

  return data;
};

export const findAllByOrganization = async (
  dto: FindAllByOrganizationParamsDto,
) => {
  const { data } = await http.get<Request[]>(
    urls.requests.findAllByOrganization(dto.organizationId),
  );

  return data;
};
