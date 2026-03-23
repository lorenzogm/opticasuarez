import Image from "../../../components/image";
import { Text } from "../../../components/text";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  details: string[];
}

interface TeamMembersProps {
  title: string;
  members: TeamMember[];
}

export default function TeamMembers({ title, members }: TeamMembersProps) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <Text
          align="center"
          as="h2"
          className="mb-12 text-gray-900 uppercase tracking-wide"
          variant="heading-2"
        >
          {title}
        </Text>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => (
            <div className="text-center" key={index}>
              <figure className="mb-6">
                <Image
                  alt={member.name}
                  className="h-80 w-full rounded-lg object-cover shadow-lg"
                  src={member.image}
                />
              </figure>

              <div>
                <Text
                  as="h3"
                  className="mb-2 text-gray-900 uppercase tracking-wide"
                  variant="heading-4"
                >
                  {member.name}
                </Text>
                <Text
                  className="mb-4 font-medium text-blue-800"
                  variant="body-lg"
                >
                  {member.role}
                </Text>

                {member.details.length > 0 && (
                  <div className="space-y-2">
                    {member.details.map((detail, detailIndex) => (
                      <Text
                        className="text-gray-600"
                        key={detailIndex}
                        variant="body-sm"
                      >
                        {detail}
                      </Text>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
