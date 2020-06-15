JWK_KEY = ASDF

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

docker build -t gg/measurements:1.0 .
docker build -t gg/stations:1.0 .
docker build -t gg/auth:1.0 .

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml