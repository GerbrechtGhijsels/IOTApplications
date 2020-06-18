JWK_KEY = ASDF

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

docker build -t gg/measurements ./measurements
docker build -t gg/stations ./stations
docker build -t gg/auth ./auth

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml

skaffold.dev
skaffold dev --no-prune

kubectl get pods

mongoimport --uri "mongodb://stations-mongo-srv:27017/stations" --collection stations --drop --file knmi_stations_2018.json

sudo nano /etc/hosts   127.0.0.1 measuring.dev

kubectl exec -it auth-mongo-depl-d4cc77cf6-5w5fl sh
mongo mongodb://auth-mongo-depl-d4cc77cf6-5w5fl.db:27017

kubectl port-forward auth-mongo-depl-d4cc77cf6-5w5fl 27017:27017

-----------------------------------------------------------
DB ports

127.0.0.1 30007 30008 30009

-----------------------------------------------------------
db Import

mongoimport --host 127.0.0.1:30007 --jsonArray --db weather --collection stations --drop --file stations.json

-----------------------------------------------------------

Api calls

https://measuring.dev/api/users/signout   POST

https://measuring.dev/api/users/signin    POST
{
"email": "test@test.com",
"password": "test"
}


https://measuring.dev/api/users/signup    POST
{
	"email": "test@test.com",
	"password": "test"
}


https://measuring.dev/api/users/currentuser  GET

-----------------------------------------------------------