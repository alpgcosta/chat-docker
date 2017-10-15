kubectl delete po $(kubectl get po | tail -n 1|awk '{print $1}')
