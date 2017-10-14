k delete po $(k get po | tail -n 1|awk '{print $1}')
