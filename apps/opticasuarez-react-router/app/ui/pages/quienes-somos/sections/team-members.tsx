import { Text } from '../../../components/text';
import Image from '../../../components/image';

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
    <section className="bg-white py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <Text
          as="h2"
          variant="heading-2"
          align="center"
          className="mb-12 text-gray-900 uppercase tracking-wide"
        >
          {title}
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <div key={index} className="text-center">
              <figure className="mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                />
              </figure>

              <div>
                <Text
                  as="h3"
                  variant="heading-4"
                  className="mb-2 text-gray-900 uppercase tracking-wide"
                >
                  {member.name}
                </Text>
                <Text
                  variant="body-lg"
                  className="mb-4 text-blue-800 font-medium"
                >
                  {member.role}
                </Text>

                {member.details.length > 0 && (
                  <div className="space-y-2">
                    {member.details.map((detail, detailIndex) => (
                      <Text
                        key={detailIndex}
                        variant="body-sm"
                        className="text-gray-600"
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
