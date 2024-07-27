import {
  Box,
  Container,
  Flex,
  Image,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { type ReactElement, useEffect, useState } from 'react';

import { UserFlag } from '@/components/shared/UserFlag';
import { Superteams } from '@/constants/Superteam';
import { userStore } from '@/store/user';

type Country = {
  name: string;
  flag: string;
  code: string;
};

const countries: Country[] = Superteams.map((superteam) => ({
  name: superteam.displayValue,
  flag: superteam.icons,
  code: superteam.code ?? 'GLOBAL',
}));

const FooterColumn: React.FC<{
  title: string;
  links: { href: string; text: string }[];
}> = ({ title, links }) => (
  <Stack align="flex-start">
    <Text
      color="brand.slate.400"
      fontSize={{ base: 'xs', md: 'sm' }}
      fontWeight="500"
      textTransform="uppercase"
    >
      {title}
    </Text>
    {links.map((link) => (
      <Link
        key={link.text}
        as={NextLink}
        color="brand.slate.500"
        fontSize={{ base: 'sm', md: 'md' }}
        _hover={{ color: 'brand.slate.600' }}
        href={link.href}
      >
        {link.text}
      </Link>
    ))}
  </Stack>
);

const SocialIcon: React.FC<{
  href: string;
  ariaLabel: string;
  icon: ReactElement;
}> = ({ href, ariaLabel, icon }) => (
  <Link aria-label={ariaLabel} href={href} isExternal>
    {icon}
  </Link>
);

const CountrySelector: React.FC = () => {
  const { userInfo } = userStore();
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    name: 'Global',
    flag: '🌍',
    code: 'global',
  });

  useEffect(() => {
    if (userInfo?.location) {
      const userCountry = countries.find(
        (country) =>
          country.name.toLowerCase() === userInfo?.location?.toLowerCase(),
      );
      setSelectedCountry(
        userCountry || { name: 'Global', flag: '🌍', code: 'global' },
      );
    }
  }, [userInfo]);

  const handleCountrySelect = (country: Country) => {
    if (country.name === 'Global') {
      router.push('/');
    } else {
      const regionUrl = `/regions/${country.name.toLowerCase()}`;
      router.push(regionUrl);
    }
  };

  return (
    <Popover closeOnBlur={true} closeOnEsc={true}>
      <PopoverTrigger>
        <Flex
          align="center"
          gap={2}
          px={2}
          py={1}
          bg="white"
          borderRadius="md"
          cursor="pointer"
        >
          {selectedCountry?.flag &&
            (selectedCountry.code === 'global' ? (
              <Text>🌍</Text>
            ) : (
              <UserFlag location={selectedCountry.code} isCode />
            ))}
          <Text userSelect={'none'}>{selectedCountry.name}</Text>
        </Flex>
      </PopoverTrigger>
      <PopoverContent w="200px">
        <PopoverBody>
          <Stack>
            {countries.map((country) => (
              <Flex
                key={country.name}
                align="center"
                gap={2}
                px={2}
                py={1}
                _hover={{ bg: 'gray.100' }}
                cursor="pointer"
                onClick={() => handleCountrySelect(country)}
              >
                <UserFlag location={country.code} isCode />
                {/* <Image w={5} mr={2} alt={country.name} src={country?.flag} /> */}
                <Text>{country.name}</Text>
              </Flex>
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const opportunities = [
    { text: 'Bounties', href: '/bounties' },
    { text: 'Projects', href: '/projects' },
    { text: 'Grants', href: '/grants' },
  ];

  const categories = [
    { text: 'Content', href: '/category/content' },
    { text: 'Design', href: '/category/design' },
    { text: 'Development', href: '/category/development' },
    { text: 'Others', href: '/category/other' },
  ];

  const about = [
    {
      text: 'FAQ',
      href: 'https://superteamdao.notion.site/Superteam-Earn-FAQ-aedaa039b25741b1861167d68aa880b1?pvs=4',
    },
    {
      text: 'Terms & Conditions',
      href: 'https://drive.google.com/file/d/1ybbO_UOTaIiyKb4Mbm3sNMbjTf5qj5mT/view',
    },
    { text: 'Privacy Policy', href: '/privacy-policy.pdf' },
    { text: 'Get Help', href: 'mailto:support@superteamearn.com' },
    {
      text: 'Changelog',
      href: 'https://superteamdao.notion.site/Superteam-Earn-Changelog-faf0c85972a742699ecc07a52b569827',
    },
  ];

  return (
    <Box as="footer" bg="white" borderTop="1px" borderTopColor="blackAlpha.200">
      <Container maxW="8xl" py={8}>
        <Flex
          align="flex-start"
          justify="space-between"
          direction={{ base: 'column', md: 'row' }}
        >
          <Flex direction="column" maxW="540px" mb={{ base: 8, md: 0 }}>
            <Flex align="center" mb={4}>
              <Image
                h={6}
                mr={4}
                alt="Superteam Earn"
                src="/assets/logo/logo.svg"
              />
            </Flex>
            <Text
              mb={6}
              color="brand.slate.500"
              fontSize={{ base: 'sm', md: 'md' }}
            >
              Discover high paying crypto bounties, projects and grants from the
              best Solana companies in one place and apply to them using a
              single profile.
            </Text>
            <Flex gap={4}>
              <SocialIcon
                href="https://github.com/SuperteamDAO/earn"
                ariaLabel="GitHub"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                }
              />
              <SocialIcon
                href="https://twitter.com/superteamearn"
                ariaLabel="Twitter"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                }
              />
              <SocialIcon
                href="https://discord.com/invite/Mq3ReaekgG"
                ariaLabel="Discord"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                }
              />
            </Flex>
          </Flex>
          <Flex
            justify={{ base: 'flex-start', md: 'flex-end' }}
            wrap="wrap"
            gap={{ base: 8, md: 16 }}
            w={{ base: '100%', md: 'auto' }}
          >
            <FooterColumn title="Opportunities" links={opportunities} />
            <FooterColumn title="Categories" links={categories} />
            <FooterColumn title="About" links={about} />
          </Flex>
        </Flex>
      </Container>
      <Box py={4} pb={{ base: 20, md: 4 }} bg="gray.100">
        <Container maxW="8xl">
          <Flex
            align={{ base: 'flex-start', md: 'center' }}
            justify="space-between"
            direction={{ base: 'column', md: 'row' }}
          >
            <Text mb={{ base: 4, md: 0 }} color="brand.slate.500" fontSize="sm">
              © {currentYear} Superteam. All rights reserved.
            </Text>
            <Flex align="center">
              <Text
                mr={2}
                color="brand.slate.500"
                fontSize="sm"
                fontWeight="500"
              >
                REGION
              </Text>
              <CountrySelector />
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
