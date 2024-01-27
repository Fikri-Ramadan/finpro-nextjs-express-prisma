import React, { startTransition, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '../ui/input';

export default function Dropdown({ value, onChangeHandler }) {
  const [categories, setCategories] = useState([]);
  const [newCategories, setNewCategories] = useState('');
  const handleAddCategories = () => {};

  return (
    <div className="w-full">
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="">
          <SelectValue placeholder="Categories" />
        </SelectTrigger>
        <SelectContent>
          {categories.length > 0 &&
            categories.map((categories, i) => (
              <SelectItem className="select-item" key={i} value={categories}>
                {' '}
                {categories.name}
              </SelectItem>
            ))}
          <AlertDialog>
            <AlertDialogTrigger className="text-xs flex w-full rounded-sm py-1 pl-4 text-blue-700">
              Create New
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>New Categories</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    type="text"
                    placeholder="Categories Name"
                    className=" text-sm"
                    onChange={(e) => setNewCategories(e.target.value)}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => startTransition(handleAddCategories)}
                >
                  Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    </div>
  );
}
