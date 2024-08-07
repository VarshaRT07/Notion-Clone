import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Skeleton } from '../ui/skeleton';

export default function Title({initialData}:{initialData: any}) {
    const inputRef = useRef(null);
    const update = useMutation(api.documents.update);
  
    const [title, setTitle] = useState(initialData.title || "Untitled");
    const [isEditing, setIsEditing] = useState(false);

    const enableInput=()=>{
        setTitle(initialData.title)
        setIsEditing(true)
    }

    const disableInput =()=>{
        setIsEditing(false)
    }

    const onChange =(event: any)=>{
        setTitle(event.target.value)
        update({
            id: initialData._id,
            title: event.target.value,
          });
    }

    const onKeyDown = (event: any) => {
        if (event.key === "Enter") {
          disableInput();
        }
      };
  
  return (
    <div className="flex items-center gap-x-1">
    {initialData.icon && <p>{initialData.icon}</p>}
    {isEditing ? (
      <Input
        ref={inputRef}
        onClick={enableInput}
        onBlur={disableInput}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={title}
        className="h-7 px-2 focus-visible:ring-transparent"
      />
    ) : (
      <Button
        onClick={enableInput}
        variant="ghost"
        size="sm"
        className="font-normal h-auto p-1"
      >
        <span className="truncate">{initialData?.title}</span>
      </Button>
    )}
  </div>
  )
}
Title.Skeleton = function TitleSkeleton() {
    return <Skeleton className="h-9 w-20 rounded-md" />;
  };
