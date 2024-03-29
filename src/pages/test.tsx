import { Suspense } from "react";
import type { NextPage } from "next";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import {
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue as mode,
  Center,
  Spinner,
} from "@chakra-ui/react";
import Layout from "components/Layout";
import WithSubnavigation from "components/TopBar";
import TestMarketList from "@/components/Home/TestMarketList";

import Banner from "components/Home/Banner";
import clientPromise from "@/lib/mongodb";

import styles from "@/styles/Home.module.css";
import { NflEvents } from "@/components/Home/NflEvents";

const Home: NextPage = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <div className={styles.container}>
        <Head>
          <title>Pascal: Trade on the outcome of events</title>
          <meta
            name="description"
            content="Trade directly on the outcome of events"
          />
          <meta property="og:title" content="Pascal" />
          <meta
            property="og:description"
            content="Trade directly on the outcome of events"
          />
          <meta property="og:image" content="/Preview.png" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <WithSubnavigation />

        <Layout>
          <Box
            maxW={{ base: "3xl", lg: "5xl" }}
            mx="auto"
            py={{ base: "10", md: "10", lg: "12" }}
            zIndex={1}
          >
            <Suspense
              fallback={
                <Center mt={"200px"}>
                  <Spinner />
                </Center>
              }
            >
              <Stack spacing={8} className={mode("", styles.homeGradientGlow)}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "4xl", sm: "4xl", lg: "6xl" }}
                >
                  <Text as={"span"} position={"relative"}>
                    Trade
                  </Text>
                  <Text as={"span"} position={"relative"} color={"gray.500"}>
                    &nbsp;directly
                  </Text>
                  <br />
                  <Text as={"span"} color={"gray.500"}>
                    on the outcome of
                  </Text>
                  <Text as={"span"}>&nbsp;events.</Text>
                </Heading>
                <Text
                  color={mode("gray.500", "gray.200")}
                  fontSize={{ base: "xl", md: "2xl" }}
                >
                  An on-chain futures derivative of real-world events.
                </Text>

                <TestMarketList events={events} />
              </Stack>
            </Suspense>
          </Box>
        </Layout>
      </div>
      <Banner />
    </div>
  );
};

export async function getStaticProps() {
  try {
    // const client = await clientPromise;
    // const db = client.db("betdex");
    // const events = await db.collection("running_markets").find({}).toArray();
    const events = NflEvents;
    return {
      props: { events: JSON.parse(JSON.stringify(events)) },
    };
  } catch (e) {
    console.error("Error connecting to MongoDB \n", e);
    return {
      props: { events: [] }, // Return an empty array or handle the error case appropriately
    };
  }
}
export default Home;
