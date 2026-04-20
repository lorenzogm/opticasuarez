#!/bin/zsh
run_id=24687317647
pr_number=414
max_attempts=50
interval=30

for ((i=1; i<=max_attempts; i++)); do
  output=$(gh run view $run_id --json status,conclusion)
  curr_status=$(echo $output | jq -r '.status')
  curr_conclusion=$(echo $output | jq -r '.conclusion')
  
  printf "Attempt %d: Status=%s, Conclusion=%s\n" "$i" "$curr_status" "$curr_conclusion"
  
  if [[ "$curr_status" == "completed" ]]; then
    echo "Run completed. Fetching PR checks..."
    gh pr checks $pr_number
    exit 0
  fi
  
  sleep $interval
done

echo "Timed out after 25 minutes. Last observed status: $curr_status"
exit 1
