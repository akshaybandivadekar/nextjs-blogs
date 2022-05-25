import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

function HomePage(props) {
  return (
    <div>
      <EventList items={props.featureEvents} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps() {
  const featureEvents = await getFeaturedEvents();

  return {
    props: {
      featureEvents,
    },
  };
}
