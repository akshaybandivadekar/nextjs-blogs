import Head from 'next/head';
import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot great events that allow you to evolve..."
        />
      </Head>
      <EventList items={props.featureEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featureEvents = await getFeaturedEvents();

  return {
    props: {
      featureEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
