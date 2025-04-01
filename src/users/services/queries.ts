import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Option } from "../../types/options";
import { User } from "../types/user";
import { Schema } from "../types/schema";

export function useStates() {
  return useQuery({
    queryKey: ["states"],
    queryFn: () =>
      axios
        .get<Option[]>("http://172.16.98.228:8080/states")
        .then((res) => res.data)
        .catch(() => {
          alert("We can't fetch states");
        }),
  });
}

export function useLanguages() {
  return useQuery({
    queryKey: ["languages"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/languages")
        .then((res) => res.data)
        .catch(() => {
          alert("We can't fetch languages");
        }),
  });
}


export function useGenders() {
  return useQuery({
    queryKey: ["genders"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/genders")
        .then((res) => res.data)
        .catch(() => {
          alert("We can't fetch genders");
        }),
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/skills")
        .then((res) => res.data)
        .catch(() => {
          alert("We can't fetch skills");
        }),
  });
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axios
        .get<User[]>("http://localhost:8080/users")
        .then((res) => res.data)
        .catch(() => {
          // alert("We can't fetch users");
        }),
  });
}


export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", { id }],
    queryFn: async (): Promise<Schema> => {
      const { data } = await axios.get<User>(`http://localhost:8080/users/${id}`);

      return {
        variant: "edit",
        id: data.id,
        name: data.name,
        email: data.email,
        formerEmploymentPeriod: [
          new Date(data.formerEmploymentPeriod[0]),
          new Date(data.formerEmploymentPeriod[1]),
        ],
        gender: data.gender,
        languagesSpoken: data.languagesSpoken,
        registrationDateAndTime: new Date(data.registrationDateAndTime),
        salaryRange: [data.salaryRange[0], data.salaryRange[1]],
        skills: data.skills,
        states: data.states,
        students: data.students,
        isTeacher: data.isTeacher,
      };
    },
    enabled: !!id, 
  });
}
