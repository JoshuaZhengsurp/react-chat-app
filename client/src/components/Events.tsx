interface EventsProps {
  events: string[];
}

export default function Events({ events }: EventsProps) {
  return (
    <ul>
      {
        events.map((event, index)=>
          <li key={ index }>{ event }</li>
        )
      }
    </ul>
  );
}
