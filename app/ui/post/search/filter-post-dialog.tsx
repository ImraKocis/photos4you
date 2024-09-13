"use client";
import { ReactElement, useState } from "react";
import { usePostFilterContext } from "@/app/ui/post/search/post-filter-context";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@nextui-org/slider";
import { DateRangePicker } from "@/app/ui/post/search/date-range-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HashIcon, SlidersHorizontal } from "lucide-react";
import { getFilterPosts } from "@/app/actions/post/actions";
import { useToast } from "@/components/ui/use-toast";

export function FilterPostDialog(): ReactElement {
  const [isSearching, setIsSearching] = useState(false);
  const {
    imageSize,
    postDate,
    setPostAuthor,
    setPostHashtag,
    postHashtag,
    setImageSize,
    postAuthor,
    allHashtags,
    setPosts,
  } = usePostFilterContext();
  const { toast } = useToast();

  const handleFilterSubmit = async () => {
    setIsSearching(true);
    const posts = await getFilterPosts({
      size: imageSize ? imageSize * 1024 * 1024 : undefined,
      createdAt: postDate ?? undefined,
      fullName: postAuthor ?? undefined,
      hashtag: postHashtag ?? undefined,
    });
    if (posts && posts.length > 0) {
      setPosts(posts);
      setIsSearching(false);
      return;
    }
    setIsSearching(false);
    toast({
      variant: "destructive",
      title: "No posts found",
      description: "Try again with different filters",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full flex justify-end mb-12">
          <button>
            <SlidersHorizontal className="w-8 h-8" />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="p-6 max-w-[350px]">
        <DialogHeader>Explore our search filters</DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              onChange={(e) => setPostAuthor(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <HashIcon className="w-4 h-4 mr-2" />
                  Hashtags
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter by hashtags</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={postHashtag}
                  onValueChange={setPostHashtag}
                >
                  {allHashtags?.map((hashtag, index) => (
                    <DropdownMenuRadioItem key={index} value={hashtag}>
                      {hashtag}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Slider
            label="Size in MB"
            step={0.1}
            maxValue={7}
            minValue={0}
            defaultValue={0.1}
            onChangeEnd={(value) =>
              setImageSize(typeof value === "number" ? value : 7)
            }
            className="mb-4"
          />
          <DateRangePicker />
        </div>
        <DialogFooter className="w-full sm:justify-between gap-12">
          <Button
            className="w-full"
            type="submit"
            disabled={isSearching}
            onClick={async () => await handleFilterSubmit()}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
