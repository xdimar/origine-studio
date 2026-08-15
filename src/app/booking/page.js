import BookingClient from './BookingClient';

export default async function BookingPage({ searchParams }) {
  // Kita tunggu (await) searchParams dulu karena di Next.js 16 ini berbentuk Promise
  const params = await searchParams;
  const serviceId = params?.serviceId;
  
  return <BookingClient serviceId={serviceId} />;
}