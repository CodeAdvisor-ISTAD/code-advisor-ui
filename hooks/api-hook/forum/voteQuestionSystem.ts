// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { getForumBySlug } from './forum-api';

// interface VoteCountData {
//   totalVotes: number;
// }

// interface VoteStatusData {
//   status: 'upvoted' | 'downvoted' | 'not_voted';
// }

// const useForumVoteSystem = (slug: string) => {
//     const queryClient = useQueryClient();

//     // Forum query
//     const { data: forum } = useQuery({
//         queryKey: ["forum", slug],
//         queryFn: () => getForumBySlug(slug),
//     });

//     // Vote status query
//     const { data: voteStatus } = useQuery<VoteStatusData>({
//         queryKey: ["vote-status", slug],
//         queryFn: () => getVoteStatus(slug),
//         enabled: !!slug,
//     });

//     // Vote counts queries
//     const { data: totalUpVotes } = useQuery<VoteCountData>({
//         queryKey: ["vote-count", slug, "up"],
//         queryFn: () => totalUpVotes(slug),
//         enabled: !!slug,
//     });

//     const { data: totalDownVotes } = useQuery<VoteCountData>({
//         queryKey: ["vote-count", slug, "down"],
//         queryFn: () => totalDownVotes(slug),
//         enabled: !!slug,
//     });

//     const voteMutation = useMutation({
//         mutationFn: (voteType: 'up' | 'down') => voteQuestion(slug, voteType),
//         onMutate: async (voteType) => {
//             await queryClient.cancelQueries({ queryKey: ["vote-status", slug] });
//             await queryClient.cancelQueries({ queryKey: ["vote-count", slug] });

//             const previousVoteStatus = queryClient.getQueryData<VoteStatusData>(["vote-status", slug]);
//             const previousUpVotes = queryClient.getQueryData<VoteCountData>(["vote-count", slug, "up"]);
//             const previousDownVotes = queryClient.getQueryData<VoteCountData>(["vote-count", slug, "down"]);

//             // Optimistically update
//             if (voteType === 'up') {
//                 queryClient.setQueryData<VoteStatusData>(["vote-status", slug], { status: 'upvoted' });
//                 if (previousUpVotes) {
//                     queryClient.setQueryData<VoteCountData>(["vote-count", slug, "up"], {
//                         totalVotes: previousUpVotes.totalVotes + 1
//                     });
//                 }
//                 if (previousVoteStatus?.status === 'downvoted' && previousDownVotes) {
//                     queryClient.setQueryData<VoteCountData>(["vote-count", slug, "down"], {
//                         totalVotes: Math.max(0, previousDownVotes.totalVotes - 1)
//                     });
//                 }
//             } else {
//                 queryClient.setQueryData<VoteStatusData>(["vote-status", slug], { status: 'downvoted' });
//                 if (previousDownVotes) {
//                     queryClient.setQueryData<VoteCountData>(["vote-count", slug, "down"], {
//                         totalVotes: previousDownVotes.totalVotes + 1
//                     });
//                 }
//                 if (previousVoteStatus?.status === 'upvoted' && previousUpVotes) {
//                     queryClient.setQueryData<VoteCountData>(["vote-count", slug, "up"], {
//                         totalVotes: Math.max(0, previousUpVotes.totalVotes - 1)
//                     });
//                 }
//             }

//             return { previousVoteStatus, previousUpVotes, previousDownVotes };
//         },
//         onError: (err, variables, context) => {
//             queryClient.setQueryData(["vote-status", slug], context?.previousVoteStatus);
//             queryClient.setQueryData(["vote-count", slug, "up"], context?.previousUpVotes);
//             queryClient.setQueryData(["vote-count", slug, "down"], context?.previousDownVotes);
//         },
//         onSettled: () => {
//             queryClient.invalidateQueries({ queryKey: ["vote-status", slug] });
//             queryClient.invalidateQueries({ queryKey: ["vote-count", slug] });
//         },
//     });

//     const handleVote = (voteType: 'up' | 'down') => {
//         if (voteStatus?.status === voteType) {
//             // If clicking the same vote type, remove the vote
//             voteMutation.mutate(voteType === 'up' ? 'down' : 'up');
//         } else {
//             // Otherwise, apply the new vote
//             voteMutation.mutate(voteType);
//         }
//     };

//     return {
//         forum,
//         voteStatus,
//         totalUpVotes,
//         totalDownVotes,
//         handleUpvote: () => handleVote('up'),
//         handleDownvote: () => handleVote('down'),
//         isVoting: voteMutation.isLoading
//     };
// };

// export default useForumVoteSystem;
