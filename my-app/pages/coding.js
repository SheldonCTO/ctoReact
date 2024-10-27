import Image from "next/image";
import Link from "next/link";


// pages/coding.js
import { useRouter } from 'next/router';

export default function CodingPage() {
  const router = useRouter();
  const { option } = router.query;

  const websiteLinks = {
    1: "https://example.com/option1",
    2: "https://example.com/option2",
    3: "https://example.com/option3",
    4: "https://example.com/option4",
  };

  return (
    <div>
      <h1>Coding Work - Option {option}</h1>
      {option && (
        <Link href={websiteLinks[option]} passHref legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
        <img
          src={`${option}.png`}
          alt={`Option ${option}`}
          style={{ maxWidth: '100%', height: 'auto' }}
          />
          </a>
        </Link>
      )}
    </div>
  );
}
