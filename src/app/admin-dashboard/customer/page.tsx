'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useStore } from '@/lib/zustand';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { decremented, incremented, reset } from '@/lib/redux/slices/count.slice';

export default function CustomersPage() {

  const count = useSelector((state: any) => state.value)
  const dispatch = useDispatch()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers number {count}</CardTitle>
        <CardDescription>View all customers and their orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col w-fit space-y-2">
          <Button onClick={() => dispatch(incremented())}>Increment</Button>
          <Button onClick={() => dispatch(decremented())}>Decrement</Button>
          <Button onClick={() => dispatch(reset())} >Reset</Button>
        </div>
      </CardContent>
    </Card>
  );
}
