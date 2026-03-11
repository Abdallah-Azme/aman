import Image from "next/image";
import React from "react";
import { TeamMember } from "@/types/home";

const TeamCard = ({ member }: { member: TeamMember }) => {
  return (
    <div className="group border border-natural-dark rounded-xl p-4 space-y-4 bg-white hover:bg-linear-to-b hover:from-primary hover:to-secondary hover:border-white ">
      <Image
        src={member.image}
        alt="team"
        width={200}
        height={200}
        className="w-full h-72  object-cover rounded-lg filter grayscale contrast-125  transition  group-hover:filter-none "
      />
      <div className="border border-natural-dark p-4 rounded-lg group-hover:border-white ">
        <h2 className="text-text text-h5 group-hover:text-white ">
          {member.name}
        </h2>
        <p className="text-natural-dark-hover text-body-xl group-hover:text-white ">
          {member.specialty}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
