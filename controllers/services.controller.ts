import { services, type ServiceItem } from "@/models/services";

export function getAllServices(): ServiceItem[] {
  return services;
}
